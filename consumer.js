const amqp=require("amqplib")
connect();
async function connect() {
    try {
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();
        const result=await channel.assertQueue("jobs");
        channel.consume("jobs",(message)=>{
            console.log(message.content.toString());
            console.log("message get sucessfullty");
             channel.ack(message);
        });

        console.log("Waiting for messages....");
        
    } catch (error) {
        console.log(error);
        
    }
}