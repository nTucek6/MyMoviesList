using Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserSupport
{
    public class Inquiry
    {
        public string Email { get; set; } 
        public SupportInquiryEnum IssueType { get; set; }
        public string InquiryText { get; set; }

    }
}
