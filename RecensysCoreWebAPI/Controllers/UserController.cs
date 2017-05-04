using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;
using RecensysCoreWebAPI.Utils;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        private readonly IUserDetailsRepository _userRepo;

        public UserController(IUserDetailsRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string sub;
            if (!User.Claims.TryGetSub(out sub)) return BadRequest("user could not be uniquely identified");

            using (_userRepo)
            {
                var uid = _userRepo.GetIdFromIdentity(sub);
                var ud = _userRepo.Get(uid);
                if (ud == null) return BadRequest("User does not exist");
                return Ok(ud);
            }
        }

        [HttpGet("userExists")]
        public IActionResult UserExists()
        {
            string sub;
            if (!User.Claims.TryGetSub(out sub)) return BadRequest("user could not be uniquely identified");

            using (_userRepo)
            {
                var uid = _userRepo.GetIdFromIdentity(sub);
                var ud = _userRepo.Get(uid);
                return Ok(ud != null);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserDetailsDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sub;
            if (!User.Claims.TryGetSub(out sub)) return BadRequest("user could not be uniquely identified");

            using (_userRepo)
            {
                var user = _userRepo.Create(dto);
                _userRepo.UpdateIdentityString(user.Id, sub);
                return Ok(user);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] UserDetailsDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using (_userRepo)
            {
                return Ok(_userRepo.Update(dto));
            }
        }

        [HttpGet("ensurecreated")]
        public IActionResult EnsureCreated()
        {
            string sub;
            if (!User.Claims.TryGetSub(out sub)) return BadRequest("user could not be uniquely identified");

            var email = User.Identity.Name;

            using (_userRepo)
            {
                var uid = _userRepo.GetIdFromIdentity(sub);
                var ud = _userRepo.Get(uid);
                
                return Ok();
            }
        }

        [HttpGet("search")]
        public IActionResult Get(string term)
        {
            if (term == null) term = "";

            
            using (_userRepo)
            {
                var results = (from r in _userRepo.Get()
                    where r.Email != null && r.Email.ToLower().Contains(term.ToLower())
                    select r).ToList();

                if (results != null)
                {
                    return Ok(results);
                }
                return NoContent();
            }


        }

        

    }
}
