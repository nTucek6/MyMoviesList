using System.ComponentModel;


namespace Entities.Enum
{
    public enum SupportInquiryEnum
    {
        [Description("Bug report")]
        Bug_report = 0,
        Login = 1,
        [Description("Movie recommendation")]
        movie_recommendation = 2,

    }
}
