using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        private IUserDetailsRepository _rdRepo;

        public UserController(IUserDetailsRepository rdRepo)
        {
            _rdRepo = rdRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                using (_rdRepo)
                {
                    return Json(_rdRepo.Get());
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("search")]
        public IActionResult Get(string term)
        {
            if (term == null) term = "";

            try
            {
                using (_rdRepo)
                {
                    var results = from r in _rdRepo.Get()
                        where r.FirstName.ToLower().Contains(term.ToLower())
                        select r;
                    return Json(results.ToList());
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserDetailsDTO dto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            using (_rdRepo)
            {
                return Ok(_rdRepo.Create(dto));
            }
        }

    }
}
