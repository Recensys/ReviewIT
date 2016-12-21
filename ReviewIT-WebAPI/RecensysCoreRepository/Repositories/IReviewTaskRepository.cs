using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IReviewTaskRepository: IDisposable
    {
        ReviewTaskListDTO GetListDto(int stageId, int userId);
        Task<ICollection<int>> GetIdsAsync(int stageId, int userId);
        Task<ReviewTaskListDTO> GetTaskAsync(int id);
        bool SetState(int id, TaskState state);
        bool Update(ReviewTaskDTO dto);
        int CountIncomplete(int stageId);
        int GetStageId(ReviewTaskDTO dto);
        int GetStageId(int id);
    }
}