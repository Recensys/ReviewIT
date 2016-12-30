using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreBLL;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;
using RecensysCoreWebAPI.Utils;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Authorize]
    [Route("api/task")]
    public class TaskController : Controller
    {

        private readonly IReviewTaskRepository _tRepo;
        private readonly IReviewTaskLogic _tLogic;
        private readonly IUserDetailsRepository _userRepo;

        public TaskController(IReviewTaskRepository tRepo, IReviewTaskLogic tLogic, IUserDetailsRepository userRepo)
        {
            _tRepo = tRepo;
            _tLogic = tLogic;
            _userRepo = userRepo;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> GetIds(int sid)
        {
            string sub;
            if (!User.Claims.TryGetSub(out sub)) return BadRequest("user could not be uniquely identified");

            if (!ModelState.IsValid || sid == 0) return BadRequest();

            using (_userRepo)
            using (_tRepo)
            {
                var uid = _userRepo.GetIdFromIdentity(sub);
                return Ok(await _tRepo.GetIdsAsync(sid, uid));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using (_tRepo) return Ok(await _tRepo.GetTaskAsync(id));
        }

        [HttpPut]
        public IActionResult Put([FromBody] ReviewTaskDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _tLogic.Update(dto);

            return NoContent();
        }

        [HttpPost("commit")]
        public IActionResult Commit([FromBody] List<int> taskIds)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _tLogic.Commit(taskIds);

            return NoContent();
        }

    }
}
