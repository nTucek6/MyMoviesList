using System.ComponentModel;

namespace Entities.Enum
{
    public enum StatusEnum
    {
        [Description("All movies")]
        All = 0,
        Watching=1,
        Completed=2,
        Dropped=3,
        [Description("Plan to watch")]
        Plan_to_watch =4
    }
}
