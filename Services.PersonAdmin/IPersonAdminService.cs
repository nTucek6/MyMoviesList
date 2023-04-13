using Entities;


namespace Services.PersonAdmin
{
    public interface IPersonAdminService
    {
        Task SavePerson(Person person);

        Task<List<PeopleEntity>> GetPeople(int PostPerPage, int Page, string? Search);
        Task<int> GetPeopleCount();
    }
}
