using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using Repositories;
using Services.EmailDto;

namespace Services.UserServiceCommands.Commands
{
    public class SendEmailCommandHandler: IRequestHandler<SendEmailCommand, string>
    {
        private readonly IUserRepository _repository;

        public SendEmailCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<string> Handle(SendEmailCommand request, CancellationToken cancellationToken)
        {
            /*
            Email emailData = new Email();
            */
            var user = _repository.GetUsersAsync().FirstOrDefaultAsync(x => x.Email == request.EmailAddress, cancellationToken: cancellationToken).Result;
            var message = new MimeMessage();
            try
            {
                if (user == null) return ("Bad");
                message.From.Add(new MailboxAddress("Todo List", SendEmailCommand.EmailClientName));
                message.To.Add(new MailboxAddress(user.FirstName, request.EmailAddress));
                message.Subject = "Message from Todo List";
                message.Body = new BodyBuilder()
                    {
                        HtmlBody = $"<div style=\"color: black;\">Your password: " +
                                   $"<div style=\"color: green;\">{user.Password}</div></div>"
                    }
                    .ToMessageBody();

                using var client = new MailKit.Net.Smtp.SmtpClient();
                await client.ConnectAsync("smtp.gmail.com", 465, true, cancellationToken); 
                await client.AuthenticateAsync(SendEmailCommand.EmailClientName,
                    SendEmailCommand.EmailClientPassword, cancellationToken);
                await client.SendAsync(message, cancellationToken);

                await client.DisconnectAsync(true, cancellationToken);
                return "";

            }
            catch (Exception e)
            {
                return e.GetBaseException().Message;
            }
        }
    }
}