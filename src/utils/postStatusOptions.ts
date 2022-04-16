import { PostStatusEnum, PostStatusPtBrEnum } from '../types/Post'

export const postStatusOptions = Object.values(PostStatusEnum).map((postStatus) => ({
  value: postStatus,
  text: PostStatusPtBrEnum[postStatus],
}))
