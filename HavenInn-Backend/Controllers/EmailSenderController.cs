
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using HavenInn_Library.Interface;
using HavenInn_Library.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Email02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSenderController : ControllerBase
    {
        private readonly HavenInnContext _context;
        IEmailSender _emailSender;
        public EmailSenderController(IEmailSender emailSender,HavenInnContext context)
        {
            _emailSender = emailSender;
            _context = context;
        }

        [HttpPost, Route("SendEmail")]
        public async Task<IActionResult> SendEmailAsync(string recipientEmail, string recipientFirstName, string Body)
        {

            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost, Route("SendEmailtoguest")]
        public async Task<IActionResult> SendEmailAsynctoguest(/*string recipientEmail, string recipientFirstName*/ string Body,int Guestid)
        {
            
            string recipientEmail= _context.Guest.Where(g=>g.GuestId==Guestid).Select(e=>e.Email).FirstOrDefault().ToString();
            string recipientFirstName = _context.Guest.Where(g => g.GuestId == Guestid).Select(e => e.Name).FirstOrDefault().ToString();
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpPost, Route("SendEmailtoUser")]
        public async Task<IActionResult> SendEmailAsynctoUser(/*string recipientEmail, string recipientFirstName*/ string Body, int Userid)
        {

            string recipientEmail = _context.User.Where(u => u.UserId == Userid).Select(e => e.Email).FirstOrDefault().ToString();
            string recipientFirstName = _context.User.Where(g => g.UserId == Userid).Select(e => e.Staff.FirstName).FirstOrDefault().ToString();
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
