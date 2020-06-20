const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'sihmarradha@gmail.com',
        to: comment.user.email,
        subject : "New Comment Published!",
        html : htmlString
    }, function(err, info){
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}