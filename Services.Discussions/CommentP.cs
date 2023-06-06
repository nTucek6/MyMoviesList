using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Discussions
{
    public class CommentP
    {
        public int DiscussionId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; }
    }
}
