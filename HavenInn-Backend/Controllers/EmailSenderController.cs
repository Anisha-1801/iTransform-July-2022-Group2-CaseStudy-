
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
        public async Task<IActionResult> SendEmailAsync(string recipientEmail, string recipientFirstName,string Subject ,string Body)
        {

            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName,Subject,Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost, Route("Reservation")]
        public async Task<IActionResult> SendEmailAsynctoguest(int id, int roomId)
        {
            string Subject = "Reservation Successful";
            var guest = _context.Guest.Where(g => g.GuestId==id).FirstOrDefault();
            string recipientEmail = guest.Email ;
            string recipientFirstName =guest.Name;
            var reservation =_context.Reservation.Where(r=>r.GuestId==guest.GuestId).Where(r=>r.RoomId == roomId).Include(i=>i.Room).FirstOrDefault();
           
            string Body =$"<h1>Welcome to HavenInn</h1><br/>"+
                         $"Your Reservation Id:{reservation.ReservationId}<br/>" +
                         $"Your Room no:{reservation.RoomId}<br/>" +
                         $"Room Details:{reservation.Room.Description}<br/>" +
                         $"Check In : {Convert.ToDateTime(reservation.CheckIn).ToShortDateString()} <br/>"+
                         $"Check out:{Convert.ToDateTime(reservation.CheckOut).ToShortDateString()}";
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Subject,Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpPost, Route("Email/Guest/Bill")]
        public async Task<IActionResult> Sendbill(/*string recipientEmail, string recipientFirstName*/ string GuestName)
        {
            string Reservationid= _context.Reservation.Where(r=>r.Guest.Name==GuestName).Select(r=>r.ReservationId).FirstOrDefault().ToString();  
            string bill = _context.Bill.Where(b => b.ReservationId == Convert.ToInt32(Reservationid)).Select(s=>s.TotalPrice).FirstOrDefault().ToString();
            string roomid =_context.Reservation.Where(r=>r.ReservationId == Convert.ToInt32(Reservationid)).Select(s=>s.RoomId).FirstOrDefault().ToString();
            string roomtypeid = _context.Room.Where(r => r.RoomId == Convert.ToInt32(roomid)).Select(s => s.RoomTypeId).FirstOrDefault().ToString();
            string roomtype = _context.RoomType.Where(r => r.RoomTypeId==Convert.ToInt32(roomtypeid)).Select(s => s.RoomTypeName).FirstOrDefault().ToString();
            string roomdescription=_context.Room.Where(r=>r.RoomId == Convert.ToInt32(roomid)).Select(s=>s.Description).FirstOrDefault().ToString();
            string Body =$"Good Morning {GuestName} <br/>" +
                        $" Room :{roomid}<br/>" +
                        $"Details:{roomdescription}<br/>" +
                        $"Roomtype :{roomtype}<br/>" +
                        $"Total Price:{bill}";
                    string Subject = "Copy of Bill";
            string recipientEmail = _context.Guest.Where(g => g.Name == GuestName).Select(e => e.Email).FirstOrDefault().ToString();
            string recipientFirstName = _context.Guest.Where(g => g.Name == GuestName).Select(e => e.Name).FirstOrDefault().ToString();
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Subject, Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        [HttpPost, Route("Email/User")]
        public async Task<IActionResult> SendEmailAsynctoUser(/*string recipientEmail, string recipientFirstName*/ string Subject,string Body, int Userid)
        {

            string recipientEmail = _context.User.Where(u => u.UserId == Userid).Select(e => e.Email).FirstOrDefault().ToString();
            string recipientFirstName = _context.User.Where(g => g.UserId == Userid).Select(e => e.Staff.FirstName).FirstOrDefault().ToString();
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName,Subject, Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
