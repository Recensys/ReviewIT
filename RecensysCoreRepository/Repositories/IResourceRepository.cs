using System;
using System.IO;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IResourceRepository: IDisposable
    {
        DataDTO Update(int dataId, string fileExtension, string contentType, Stream stream);
        bool Delete(int fieldId);
    }
}