import {Controller, Get, HostParam} from '@nestjs/common';

/**
 * api.localhost로 설정하기 위해서는 /etc/hosts 파일에 내용을 추가해야 한다.
 *
 * 127.0.0.1    api.localhost
 * 127.0.0.1    v1.api.localhost
 */
@Controller({host: ':version.api.localhost'})
export class ApiController {

    @Get()
    indexWithVersion(@HostParam('version') version: string): string {
        return `Hello, API ${version}`;
    }
}
