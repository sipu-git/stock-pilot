import {
  LambdaClient,
  InvokeCommand,
} from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

export async function invokeNotificationLambda(
  payload: Record<string, unknown>,
) {
  const command = new InvokeCommand({
    FunctionName:
      process.env.NOTIFICATION_LAMBDA_NAME ||
      "stockpilot-dev-notification-lambda",

    InvocationType: "Event",

    Payload: Buffer.from(
      JSON.stringify(payload),
    ),
  });

  await lambdaClient.send(command);
}