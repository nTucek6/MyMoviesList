using Entities;


namespace Services.PersonAdmin
{
    public interface IPersonAdminService
    {
        Task SavePerson(PeopleEntity person);

        Task<List<PeopleEntity>> GetPeople();
        Task<int> GetPeopleCount();
    }
}
