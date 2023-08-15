using Entities;

namespace Services.UserSupport
{
    public interface IUserSupportService
    {
        Task<List<UserInquirySelect>> GetUserInquirySelect();
        Task SubmitInquiry(Inquiry inquiry);
        Task<int> GetUserIssuesCount();
        Task<List<Issue>> GetUserIssues(int PostPerPage,int Page,string? Search);
        Task ResolveIssue(int Id);



    }
}
