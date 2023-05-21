
using Entities;
using Services.MovieInfo;

namespace Services.Profile
{
    public interface IProfileService
    {
        Task<string> GetUserBio(string username);
        Task<List<StatusSelect>> GetProfileStatus();
        Task<List<UserMovie>> GetUserList(string username, int statusId);
        Task<decimal> GetTimeSpentWatching(string username);
        Task<List<StatusInfo>> GetStatusInfo(string username);
        Task<List<UserMovie>> GetLastUpdate(int PostPerPage, int Page,string username);
        Task<byte[]> GetProfileImage(string username);

    }
}
