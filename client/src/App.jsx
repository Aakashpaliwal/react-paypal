import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [authToken, setAuthToken] = useState("");

  //LOGIN
  const loginHandler = async () => {
    try {
      const clientId =
        "AfiAu4Pd1gaVDHaTYzKnAtkrQZMhfISX3eyWMwLed_AR61Smw7HLafngwvF_DnHbp3Rs-95zJOFpGX9h";
      const clientSecret =
        "ECdlpLzXIvehwKcIZBO-1TN5m-CYPB8_sD8NYqZANEs4K1rdtFTGBxmPk0-M_7PzIcJCMwLIUDL1pv7S";

      const credentials = `${clientId}:${clientSecret}`;
      const base64Credentials = btoa(credentials);

      // const auth = Buffer.from(
      //   "AfiAu4Pd1gaVDHaTYzKnAtkrQZMhfISX3eyWMwLed_AR61Smw7HLafngwvF_DnHbp3Rs-95zJOFpGX9h" +
      //     ":" +
      //     "ECdlpLzXIvehwKcIZBO-1TN5m-CYPB8_sD8NYqZANEs4K1rdtFTGBxmPk0-M_7PzIcJCMwLIUDL1pv7S"
      // ).toString("base64");

      const response = await fetch(
        `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
        {
          method: "POST",

          body: "grant_type=client_credentials",

          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setAuthToken(data.access_token);
      localStorage.setItem("tokenHere", data.access_token);
      //   return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    // script.src = 'https://www.paypal.com/sdk/js?client-id=AfiAu4Pd1gaVDHaTYzKnAtkrQZMhfISX3eyWMwLed_AR61Smw7HLafngwvF_DnHbp3Rs-95zJOFpGX9h&vault=true&intent=subscription&disable-funding=credit,card';
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AfiAu4Pd1gaVDHaTYzKnAtkrQZMhfISX3eyWMwLed_AR61Smw7HLafngwvF_DnHbp3Rs-95zJOFpGX9h&vault=true&intent=subscription";
    // script.src="https://www.paypal.com/sdk/js?client-id=sb&vault=true&intent=subscription"
    script.async = true;
    script.onload = () => {
      initializePayPalButton();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayPalButton = () => {

    // axios.get('https://api-m.sandbox.paypal.com/v1/notifications/webhooks', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem("tokenHere")}`
    //   }
    // })
    //   .then(response => {
    //     // Handle success
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     // Handle error
    //     console.error(error);
    //   });


    window.paypal
      .Buttons({
        style: {
          shape: "rect",
          color: "blue",
          layout: "vertical",
          label: "subscribe",
        },
        createSubscription: function (data, actions) {
          console.log(actions);
          console.log(data);
          return actions.subscription.create({
            plan_id: "P-6KR80334P92545453MWVCJQI", // Replace with your plan ID
          });
        },
        onApprove: async function (data, actions) {
          console.log(actions);
          console.log(data);
          console.log(
            "You have successfully subscribed to " + data.subscriptionID
          );


          axios.get('https://api-m.sandbox.paypal.com/v1/notifications/webhooks', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("tokenHere")}`
            }
          })
            .then(response => {
              // Handle success
              console.log(response.data);
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });

          // fetch("https://api-m.sandbox.paypal.com/v1/notifications/webhooks", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${localStorage.getItem("tokenHere")}`,
          //   },
          //   body: JSON.stringify({
          //     url: "http://localhost:5173/",
          //     event_types: [
          //       { name: "PAYMENT.AUTHORIZATION.CREATED" },
          //       { name: "PAYMENT.AUTHORIZATION.VOIDED" },
          //       { name: "BILLING.SUBSCRIPTION.CREATED" },
          //     ],
          //   }),
          // })
          //   .then((res) => {
          //     console.log(res);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

          // const resultHere = await axios.post('http://localhost:5000/webhook')
          // console.log(resultHere)
          // const result = await axios.post(
          //   "http://localhost:5000/cancelPreviousSubscription", {
          //     authToken
          //   }
          // );
          // console.log(result);
          // try {
          //   const resultHere = await axios.post(
          //     "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-3BP0S32VRSFT/cancel",
          //     {
          //       "reason": "Not satisfied with the service"
          //     },
          //     {
          //       headers: {
          //         "Content-Type": "application/json",
          //         "Authorization": `Bearer ${localStorage.getItem('tokenHere')}`
          //       }
          //     }
          //   );

          //   console.log('deleteSubs', resultHere.data);
          // } catch (error) {
          //   console.error(error);
          // }
        },
      })
      .render("#paypal-button-container");
  };

  return (
    <>
      {console.log(97, authToken)}
      <button
        onClick={() => {
          loginHandler();
        }}
      >
        Login
      </button>
      <br />
      <br />
      <div id="paypal-button-container"></div>
    </>
  );
}

export default App;
