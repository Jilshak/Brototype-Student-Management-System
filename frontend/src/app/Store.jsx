import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/UserSlice'
import BatchSlice from '../features/BatchSlice'
import AuthorizeSlice from '../features/AuthorizeSlice'
import WeekDetailsSlice from '../features/WeekDetails'
import AssignTimeSlice from '../features/AssignTimeSlice'
import ScheduleTime from '../features/ScheduleTimeSlice'
import BookingSlice from '../features/BookingSlice'
import ReviewCompleteSlice from '../features/ReviewCompletedSlice'
import ChatSlice from '../features/ChatSlice'


export const store = configureStore({
    reducer: {
        Users: UserSlice,
        Batches: BatchSlice,
        Authorize: AuthorizeSlice,
        WeekDetails: WeekDetailsSlice,
        Booking: AssignTimeSlice,
        Schedule: ScheduleTime,
        Booked: BookingSlice,
        ReviewCompleted: ReviewCompleteSlice,
        Chats: ChatSlice,
    }
})