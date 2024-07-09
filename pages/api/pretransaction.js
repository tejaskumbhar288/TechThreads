const https = require("https");
const PaytmChecksum = require("paytmchecksum");

export default async function handler(req, res) {
  if (req.method === "POST") {
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "WEBSTAGING",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    const post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: process.env.PAYTM_HOST,
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${paytmParams.body.orderId}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        let response = "";
        const post_req = https.request(options, (post_res) => {
          post_res.on("data", (chunk) => {
            response += chunk;
          });

          post_res.on("end", () => {
            console.log("Response: ", response);
            resolve(JSON.parse(response).body);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };

    let myr = await requestAsync();
    res.status(200).json(myr);
  }
}
