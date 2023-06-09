using DatabaseContext;
using Entities;
using Entities.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyMoviesList.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly JwtConfiguration jwtConfig;
        private readonly MyMoviesListContext myMoviesListContext;

        public AuthenticationService(MyMoviesListContext _myMoviesListContext, IOptionsMonitor<JwtConfiguration> jwtConfiguration)
        {
            myMoviesListContext = _myMoviesListContext;
            jwtConfig = jwtConfiguration.CurrentValue;
        }


        public async Task<string> Register(Register user)
        {
            if ((await myMoviesListContext.Users.Where(u => u.Username == user.Username).SingleOrDefaultAsync()) != null)
                throw new Exception("User exist!");
   
            if ((await myMoviesListContext.Users.Where(u => u.Username == user.Username).SingleOrDefaultAsync()) != null )
                throw new Exception("User cannot have same username!");

            string passwordHash = GenerateHash(user.Password);

          
            await myMoviesListContext.Users.AddAsync(
            new UsersEntity
            {
                Email = user.Email,
                Username = user.Username,
                PasswordHash = passwordHash,
                RoleId = (RolesEnum)3,
                Joined = DateTime.Now
            });

            await myMoviesListContext.SaveChangesAsync();

            string token = await Login(
                new User {
                    Email = user.Email,
                    Password = user.Password });

            return token;

        }

        public async Task<string> Login(User user)
        {
            var userDb = await myMoviesListContext.Users.Where(u => u.Email == user.Email).SingleOrDefaultAsync();

            if (userDb is null)
                throw new Exception("User not found");

            string passwordHash = GenerateHash(user.Password);

            if (userDb.PasswordHash != passwordHash)
             throw new Exception("Invalid password");

            var token = GenerateToken(userDb);

            return token;
        }



        public async Task ChangePassword(UserUpdate user)
        {
            var userDb = await myMoviesListContext.Users.Where(u => u.Id == user.Id).SingleOrDefaultAsync();

            if(userDb != null)
            {
                if(user.Password != null)
                {
                    string newPassword = GenerateHash(user.Password);

                    userDb.PasswordHash = newPassword;

                    myMoviesListContext.Users.Update(userDb);
                  await myMoviesListContext.SaveChangesAsync();
                }
            }

        }

        public async Task<string> ChangeEmail(UserUpdate user)
        {
            var userDb = await myMoviesListContext.Users.Where(u => u.Id == user.Id).SingleOrDefaultAsync();

            if (userDb != null)
            {
                if (user.Email != null)
                {
                    userDb.Email = user.Email;

                    myMoviesListContext.Users.Update(userDb);

                    await myMoviesListContext.SaveChangesAsync();

                    string token = GenerateToken(userDb);

                    return token;
                }
            }
            return null;
        }

        public async Task<string> ChangeUsername(UserUpdate user)
        {
            var userDb = await myMoviesListContext.Users.Where(u => u.Id == user.Id).SingleOrDefaultAsync();

            if (userDb != null)
            {
                if (user.Username != null)
                {
                 
                    userDb.Username = user.Username;

                    myMoviesListContext.Users.Update(userDb);

                    await myMoviesListContext.SaveChangesAsync();

                    string token = GenerateToken(userDb);

                    return token;

                }
            }
            return null;
        }

        public async Task ChangeBio(UserUpdate user)
        {
            var userDb = await myMoviesListContext.Users.Where(u => u.Id == user.Id).SingleOrDefaultAsync();

            if (userDb != null)
            {
                if (user.Bio != null)
                {
                    if(user.Bio == "")
                    {
                        userDb.UserBio = null;
                    }
                    else
                    {
                        userDb.UserBio = user.Bio;
                    }

                    myMoviesListContext.Users.Update(userDb);

                    await myMoviesListContext.SaveChangesAsync();
                }
            }
        }

        public async Task ChangeProfileImage(UserUpdate user)
        {
            var userDb = await myMoviesListContext.Users.Where(u => u.Id == user.Id).SingleOrDefaultAsync();

            if (userDb != null)
            {

                    if (user.UserImageData != null)
                    {
                        userDb.ProfileImageData = ImageToByte(user.UserImageData);
                    }
                    else
                    {
                        userDb.ProfileImageData = null;
                    }

                    myMoviesListContext.Users.Update(userDb);

                    await myMoviesListContext.SaveChangesAsync();
                
            }
        }


        public string GenerateToken(UsersEntity user)
        {
            // generate token that is valid for 15 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email),
                    new Claim("Username", user.Username),
                    new Claim("Role", user.RoleId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(jwtConfig.AccessTokenExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        public string GenerateHash(string value)
        {
            string valueHash = "";
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(value));
                StringBuilder builder = new();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                valueHash = builder.ToString();
            }

            return valueHash;
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




        //public async Task<string> ValidateToken(string token)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);
        //    try
        //    {
        //        tokenHandler.ValidateToken(token, new TokenValidationParameters
        //        {
        //            ValidateIssuerSigningKey = true,
        //            IssuerSigningKey = new SymmetricSecurityKey(key),
        //            ValidateIssuer = false,
        //            ValidateAudience = false,
        //            // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
        //            ClockSkew = TimeSpan.Zero
        //        }, out SecurityToken validatedToken);

        //        var jwtToken = (JwtSecurityToken)validatedToken;
        //        var username = jwtToken.Claims.First(x => x.Type == "Username").Value;

        //        // return user username from JWT token if validation successful
        //        return username;
        //    }
        //    catch
        //    {
        //        // return null if validation fails
        //        return null;
        //    }
        //}

        //public async Task<string> GetRole(string token)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);
        //    try
        //    {
        //        tokenHandler.ValidateToken(token, new TokenValidationParameters
        //        {
        //            ValidateIssuerSigningKey = true,
        //            IssuerSigningKey = new SymmetricSecurityKey(key),
        //            ValidateIssuer = false,
        //            ValidateAudience = false,
        //            // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
        //            ClockSkew = TimeSpan.Zero
        //        }, out SecurityToken validatedToken);

        //        var jwtToken = (JwtSecurityToken)validatedToken;
        //        var role = jwtToken.Claims.First(x => x.Type == "Role").Value;


        //        // return user username from JWT token if validation successful
        //        return role;
        //    }
        //    catch
        //    {
        //        // return null if validation fails
        //        return null;
        //    }
        //}

    }
}