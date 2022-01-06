"use strict";
const nodemailer = require("nodemailer");
const inquirer = require("inquirer");

const sendEmail = async (answer) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: "1508771379@qq.com",
      pass: "jlqfnrecqdsdjeif",
    },
  });
  let info = await transporter.sendMail({
    from: "1508771379@qq.com", 
    to: answer.to,
    subject: answer.title,
    text: answer.text,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

inquirer
  .prompt([
    {
      type: "input",
      message: "请输入收件人邮箱地址：",
      name: "to",
      default: "",
    },
    {
      type: "input",
      message: "请输入邮件标题:",
      name: "title",
      default: "",
    },
    {
      type: "input",
      message: "请输入邮件内容:",
      name: "text",
      default: "",
    },
  ])
  .then((answer) => {
    console.log("正在发送...")
    sendEmail(answer).catch(console.error);
  });
