using Entities;

namespace Services.PersonInfo
{
    public interface IPersonInfoService
    {
        Task<PeopleEntity> GetPersonInfo(int personId);
        Task<List<MovieInfoPerson>> GetPersonActorRoles(int personId);
        Task<List<MoviesEntity>> GetPersonDirectorRoles(int personId);
        Task<List<MoviesEntity>> GetPersonWriterRoles(int personId);


    }
}
