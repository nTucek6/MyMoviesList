
using Entities;
using Services.MovieInfo;

namespace Services.Profile
{
    public interface IProfileService
    {
        Task<string> GetUserBio(int Id);
        Task<List<StatusSelect>> GetProfileStatus();
        Task<List<UserMovie>> GetUserList(string username, int statusId);
        Task<decimal> GetTimeSpentWatching(string username);
        Task<List<StatusInfo>> GetStatusInfo(string username);

    }
}
