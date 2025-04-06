import axios from "axios";

export async function createOrder(paymentAmount: number) {
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: paymentAmount,
        },
      },
    ],
  };

  const accessToken = await getAccessToken();
  const url = `${process.env.PAYPAL_API_URL}/v2/checkout/orders`;

  const response = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { orderID: response.data.id }; // Returns the order ID and approval link
}

// Function to get a fresh access token from PayPal
export async function getAccessToken() {
  const url = `${process.env.PAYPAL_API_URL}/v1/oauth2/token`;

  try {
    const response = await axios.post(
      url,
      "grant_type=client_credentials", // Format the body correctly
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_CLIENT_ID!,
          password: process.env.PAYPAL_CLIENT_SECRET!,
        },
      }
    );

    //console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

export async function captureOrder(orderID: string) {
  const accessToken = await getAccessToken();
  const url = `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`;

  const response = await axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data; // Contains captured payment details
}

// export async function createPayout(recipients: Object) {
//   const accessToken = await getAccessToken();
//   const response = await axios.post(
//     `${PAYPAL_API_URL}/v1/payments/payouts`,
//     {
//       sender_batch_header: {
//         sender_batch_id: `Payouts_${Date.now()}`,
//         email_subject: 'You have a payout!',
//       },
//       items: recipients,
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return response.data; // Contains payout_batch_id
// }

// const exampleRecipients = [
//   {
//     recipient_type: 'EMAIL',
//     amount: { value: '0.01', currency: 'USD' },
//     receiver: 'sb-vubop39790271@personal.example.com',
//     note: 'Payment for services',
//     recipient_wallet: "Venmo"
//   },
//   {
//     recipient_type: 'PHONE',
//     amount: { value: '0.02', currency: 'USD' },
//     receiver: '+14087385771',
//     recipient_wallet: "Venmo"
//   },
// ];

// /*
// var order = (await createOrder("0.01", "USD"));
// console.log(order.approvalLink);
// console.log(order.orderID);

// /*
// This block of code is for testing only.
// It creates a pause so that the user can click on the PayPal link and approve the payment.
// * /
// import readline from 'node:readline';
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// function waitForInput(promptMessage) {
//   return new Promise((resolve) => {
//     rl.question(promptMessage, (input) => {
//       resolve(input);
//     });
//   });
// }
// await waitForInput("Press Enter to continue...");
// rl.close();
// /*End of pause block* /

// // var captureResponse = await captureOrder(order.orderID);
// // console.log(captureResponse);

// var payoutData = await createPayout(exampleRecipients);
// console.log("PAYOUT DATA:", payoutData);
// console.log("Done");
// */
