import Listing from 'components/Listing'
import Error from 'components/Error'

export default [
  {
    path: '/',
    component: Listing,
    meta: { page: 'hot' }
  },
  {
    path: '/new',
    component: Listing,
    meta: { page: 'new' }
  },
  {
    path: '/rising',
    component: Listing,
    meta: { page: 'rising' }
  },
  {
    path: '/controversial',
    component: Listing,
    meta: { page: 'controversial' }
  },
  {
    path: '/top',
    component: Listing,
    meta: { page: 'top' }
  },
  {
    path: '/r/:subreddit',
    component: Listing,
    meta: { page: 'hot' }
  },
  {
    path: '/r/:subreddit/new',
    component: Listing,
    meta: { page: 'new' }
  },
  {
    path: '/r/:subreddit/rising',
    component: Listing,
    meta: { page: 'rising' }
  },
  {
    path: '/r/:subreddit/controversial',
    component: Listing,
    meta: { page: 'controversial' }
  },
  {
    path: '/r/:subreddit/top',
    component: Listing,
    meta: { page: 'top' }
  },
  {
    path: '*',
    component: Error
  }
]
