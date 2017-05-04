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
    public class FieldController : Controller
    {

        private IFieldRepository _repo;

        public FieldController(IFieldRepository repo)
        {
            _repo = repo;
        }


        [HttpGet]
        public IActionResult Get(int studyId)
        {
            try
            {
                using (_repo)
                {
                    return Json(_repo.GetAll(studyId).ToList());
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // GET: api/values
        [HttpGet("search")]
        public IActionResult Get(int studyId, string term)
        {
            if (term == null) term = "";
            try
            {
                using (_repo)
                {
                    var results = from r in _repo.GetAll(studyId)
                        where r.Name.ToLower().Contains(term.ToLower())
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
        public IActionResult Put(int studyId, [FromBody] FieldDTO[] dtos)
        {
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                using (_repo)
                {
                    return Json(_repo.Update(studyId, dtos));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
    }
}
