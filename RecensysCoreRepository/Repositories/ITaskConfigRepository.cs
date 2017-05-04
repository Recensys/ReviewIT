using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface ITaskConfigRepository: IDisposable
    {
        int Create(int stageId, int articleId, int ownerId, int[] requestedFields);
    }
}
