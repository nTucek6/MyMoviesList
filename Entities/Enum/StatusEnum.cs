using System.ComponentModel;

namespace Entities.Enum
{
    public enum StatusEnum
    {
        Watching=1,
        Completed=2,
        Dropped=3,
        [Description("Plan to watch")]
        Plan_to_watch =4
    }
}
