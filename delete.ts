import { getAwsClient, getOrCreateBucket, getRegions } from "@remotion/lambda";
import dotenv from "dotenv";
import { getAccountCount } from "./src/helpers/get-account-count";
import { setEnvForKey } from "./src/helpers/set-env-for-key";

dotenv.config();

const count = getAccountCount();
console.log(`Found ${count} accounts. Deploying...`);

for (let i = 2; i <= count; i++) {
  for (const region of getRegions()) {
    if (region === "us-west-1") {
      continue;
    }

    setEnvForKey(i);
    const { bucketName } = await getOrCreateBucket({ region });
    const { sdk, client } = getAwsClient({ region, service: "s3" });
    const results = [];

    let contToken: string | undefined;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await client.send(
        new sdk.ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: "renders",
          ContinuationToken: contToken,
        }),
      );
      if ((res.Contents?.length ?? 0) > 0) {
        await client.send(
          new sdk.DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
              Objects: res.Contents?.map((c) => ({
                Key: c.Key as string,
              })),
            },
          }),
        );

        results.push(...(res.Contents ?? []));
        console.log(
          "Deleted",
          results.length,
          "objects in",
          bucketName,
          "in",
          region,
          "for account",
          i,
        );
      } else {
        console.log(
          "No more objects to delete in",
          bucketName,
          "in",
          region,
          "for account",
          i,
        );
      }

      if (!res.NextContinuationToken) {
        break;
      }

      contToken = res.NextContinuationToken;
    }
  }
}
