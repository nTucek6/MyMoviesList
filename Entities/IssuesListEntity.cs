using Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class IssuesListEntity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public SupportInquiryEnum IssueType { get; set; }
        public string InquiryText { get; set; }
        public DateTime TimeAdded { get; set; }
        public bool IsResolved { get; set; }

    }
}
