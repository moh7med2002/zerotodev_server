import { repositories } from 'src/common/enums/repositories';
import { SocailMedia } from './social-media.entity';

export const SocialMediaProvider = [
  {
    provide: repositories.social_media_repository,
    useValue: SocailMedia,
  },
];
