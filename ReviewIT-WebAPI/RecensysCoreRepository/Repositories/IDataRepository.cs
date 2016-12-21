using System;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IDataRepository: IDisposable
    {
        DataDTO Read(int id);
        DataDTO Read(int articleId, int fieldId);
    }
}