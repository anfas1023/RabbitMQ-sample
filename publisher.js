const amqp=require("amqplib")
const msg={number:10}
connect();
async function connect() {
    try {
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();
        const result=await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)))
        console.log(`job sent sucessfully ${msg.number}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.log(error);
    }
}