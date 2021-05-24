import { Test, TestingModule } from '@nestjs/testing'
import { SyncSourceService } from '../sync-source.service'

describe('SyncSourceService', () => {
    let service: SyncSourceService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SyncSourceService],
        }).compile()

        service = module.get<SyncSourceService>(SyncSourceService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
