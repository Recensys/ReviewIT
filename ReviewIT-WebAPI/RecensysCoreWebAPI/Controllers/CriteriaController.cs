using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Route("api/study/{studyId}/[controller]")]
    public class CriteriaController : Controller
    {

        public readonly ICriteriaRepository _repo;

        public CriteriaController(ICriteriaRepository repo)
        {
            _repo = repo;
        }

        // GET api/values/5
        [HttpGet]
        public IActionResult Get(int studyId)
        {
            try
            {
                using (_repo)
                {
                    return Json(_repo.Read(studyId));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // POST api/values
        [HttpPut]
        public IActionResult Update(int studyId, [FromBody]CriteriaDTO dto)
        {

            if (!ModelState.IsValid) return BadRequest();

            try
            {
                using (_repo)
                {
                    return Json(_repo.Update(studyId, dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
    }
}
