
using System.Threading.Tasks;

namespace HavenInn_Library.Interface
{
    public interface IEmailSender
    {
        Task<string> SendEmailAsync(string recipientEmail, string recipientFirstName, string Body);
    }
}
