using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Route("api/stage/{stageId}/[controller]")]
    public class StageFieldController : Controller
    {

        private readonly IStageFieldsRepository _sfRepo;

        public StageFieldController(IStageFieldsRepository sfRepo)
        {
            _sfRepo = sfRepo;
        }


        [HttpGet]
        public IActionResult Get(int stageId)
        {
            try
            {
                using (_sfRepo)
                {
                    return Json(_sfRepo.Get(stageId));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("async")]
        public async Task<IActionResult> GetAsync(int stageId)
        {
            try
            {
                using (_sfRepo)
                {
                    return Json(await _sfRepo.GetAsync(stageId));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        // PUT api/values/5
        [HttpPut]
        public IActionResult Put(int stageId, [FromBody]StageFieldsDTO dto)
        {
            try
            {
                using (_sfRepo)
                {
                    return Json(_sfRepo.Update(stageId, dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // PUT api/values/5
        [HttpPut("async")]
        public async Task<IActionResult> PutAsync(int stageId, [FromBody]StageFieldsDTO dto)
        {
            try
            {
                using (_sfRepo)
                {
                    return Json(await _sfRepo.UpdateAsync(stageId, dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
    }
}
