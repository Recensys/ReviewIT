using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Route("api/Stage/{stageId}/[controller]")]
    public class DistributionController : Controller
    {

        public IDistributionRepository _repo;
        public DistributionController(IDistributionRepository repo)
        {
            _repo = repo;
        }

        // GET api/values/5
        [HttpGet]
        public IActionResult Get(int stageId)
        {
            try
            {
                using (_repo)
                {
                    return Json(_repo.Read(stageId));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Put(int stageId, [FromBody]DistributionDTO dto)
        {
            if(!ModelState.IsValid) return BadRequest();

            try
            {
                using (_repo)
                {
                    return Ok(_repo.Update(dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
    }
}
