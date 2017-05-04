using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IFieldRepository: IDisposable
    {
        IEnumerable<FieldDTO> GetAll(int studyId);

        bool Update(int studyId, FieldDTO[] dtos);
    }
}
