﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.EmailSender
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email,string subject, string message);


    }
}
