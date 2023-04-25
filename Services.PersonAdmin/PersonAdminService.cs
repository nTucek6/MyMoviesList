using Entities;
using DatabaseContext;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;
using System;

namespace Services.PersonAdmin
{
    public class PersonAdminService : IPersonAdminService
    {

        private readonly MyMoviesListContext myMoviesListContext;

        public PersonAdminService( MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<List<PeopleEntity>> GetPeople(int PostPerPage, int Page, string? Search)
        {
            Expression<Func<PeopleEntity, bool>> predicate = x => true;

            if (!String.IsNullOrEmpty(Search))
            {
                predicate = x => x.FirstName.Contains(Search) || x.LastName.Contains(Search);
            }

            var people = await myMoviesListContext.People
                .Where(predicate)
                .OrderBy(o => o.FirstName)
                .Select(p =>
                new PeopleEntity
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    BirthDate = p.BirthDate,
                    BirthPlace = p.BirthPlace,
                    PersonImageData = p.PersonImageData
                }
                )
                .Skip((Page - 1) * PostPerPage)
                .Take(PostPerPage)
                .ToListAsync();
            return people;

        }

        public async Task SavePerson(Person person)
        {
           
            if(person.Id > 0)
            {
                var personDb = await myMoviesListContext.People.Where(w => w.Id == person.Id).FirstOrDefaultAsync();
                personDb.FirstName = person.FirstName;
                personDb.LastName = person.LastName;
                personDb.BirthDate = person.BirthDate;
                personDb.BirthPlace = person.BirthPlace;

                if(person.PersonImage != null)
                {
                    personDb.PersonImageData = ImageToByte(person.PersonImage);
                }


                myMoviesListContext.Update(personDb);


            }
            else
            {
                byte[] s = ImageToByte(person.PersonImage);

                await myMoviesListContext.People.AddAsync(new PeopleEntity
                {
                    FirstName = person.FirstName,
                    LastName = person.LastName,
                    BirthDate = person.BirthDate,
                    BirthPlace = person.BirthPlace,
                    PersonImageData = s
                });
            }

            await myMoviesListContext.SaveChangesAsync();
        }

        public async Task<int> GetPeopleCount()
        {
            var count = await myMoviesListContext.People.CountAsync();

            return count;
        }



        private byte[] ImageToByte(IFormFile image)
        {
            byte[] s = null;
            using (var ms = new MemoryStream())
            {
                image.CopyTo(ms);
                s = ms.ToArray();

            }

            return s;

        }


    }
}
