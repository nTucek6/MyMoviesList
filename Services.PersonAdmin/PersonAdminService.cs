using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Services.PersonAdmin
{
    public class PersonAdminService : IPersonAdminService
    {

        private readonly MyMoviesListContext myMoviesListContext;

        public PersonAdminService( MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<List<PeopleEntity>> GetPeople()
        {
            var people = await myMoviesListContext.People.Select(p =>
                new PeopleEntity 
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    BirthDate = p.BirthDate,
                    BirthPlace = p.BirthPlace
                }
                ).ToListAsync();
            return people;
        }

        public async Task SavePerson(PeopleEntity person)
        {
           await myMoviesListContext.People.AddAsync(new PeopleEntity 
           {
               FirstName = person.FirstName,
               LastName = person.LastName,
               BirthDate= person.BirthDate,
               BirthPlace= person.BirthPlace,
               PersonImageURL = person.PersonImageURL
           });

           await myMoviesListContext.SaveChangesAsync();

        }

        public async Task<int> GetPeopleCount()
        {
            var count = await myMoviesListContext.People.CountAsync();

            return count;
        }

    }
}
