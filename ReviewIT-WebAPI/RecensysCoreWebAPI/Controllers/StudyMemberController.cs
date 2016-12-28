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
    [Route("api/study/{studyId}/[controller]")]
    public class StudyMemberController : Controller
    {

        private readonly IStudyMemberRepository _smRepo;

        public StudyMemberController(IStudyMemberRepository smRepo)
        {
            _smRepo = smRepo;
        }

        [HttpGet]
        public IActionResult Get(int studyId)
        {
            try
            {
                using (_smRepo)
                {
                    return Json(_smRepo.Get(studyId));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("search")]
        public IActionResult Search(int studyId, string term)
        {
            if (term == null) term = "";

            try
            {
                using (_smRepo)
                {
                    var results = from r in _smRepo.Get(studyId)
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

        [HttpPut]
        public IActionResult Put(int studyId, [FromBody] StudyMemberDTO[] dtos)
        {

            if(!ModelState.IsValid) return BadRequest();

            try
            {
                using (_smRepo)
                {
                    return Ok(_smRepo.Update(studyId, dtos));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
    }
}
