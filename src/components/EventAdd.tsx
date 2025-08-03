import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/useStoreTypes';
import { ToastService } from '../services/ToastService';
import { UtilService } from '../services/UtilService';
import { addEvent } from '../store/actions/EventActions';
import type { Event } from '../types/Event';
import { FormField } from './FormField';


interface Props {
    selectedLocation: { lat: number; lng: number; };
    setInfoWindow: (infoWindow: any) => void;
}


// Zod schema for form validation
const eventFormSchema = z.object({
    type: z.enum(['שריפה', 'גניבה', 'חיתוך גדר', 'איום בפרוטקשן', 'ירי', 'פלישת עדר']),
    farmId: z.string().min(1, 'יש לבחור חווה')
});
export type EventFormData = z.infer<typeof eventFormSchema>;


export const EventAdd = (props: Props) => {
    const { selectedLocation, setInfoWindow } = props;
    const dispatch = useAppDispatch();
    const { farms } = useAppSelector(state => state.farmModule);
    const { he } = UtilService;
    const form = useForm<EventFormData>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            type: 'שריפה',
            farmId: ''
        }
    });
    const { handleSubmit, setValue, formState: { isSubmitting } } = form;


    // Auto-select closest farm
    useEffect(() => {
        if (farms.length) {
            const closestFarm = farms.reduce((prevFarm, currFarm) => {
                const prevDist = Math.abs(selectedLocation.lat - prevFarm.location.lat) + Math.abs(selectedLocation.lng - prevFarm.location.lng);
                const currDist = Math.abs(selectedLocation.lat - currFarm.location.lat) + Math.abs(selectedLocation.lng - currFarm.location.lng);
                return prevDist < currDist ? prevFarm : currFarm;
            });
            setValue('farmId', closestFarm.id);
        }
    }, [farms, selectedLocation, setValue]);


    const onSubmit = async (eventFormData: EventFormData) => {
        const eventToAdd = {
            location: selectedLocation,
            type: eventFormData.type,
            status: 'pending',
            createdAt: Date.now(),
            completedAt: null
        } as Event;
        try {
            await dispatch(addEvent(eventToAdd, eventFormData.farmId));
            ToastService.showSuccessMsg('האירוע נוצר בהצלחה.');
            setInfoWindow(null);
        } catch (err) {
            ToastService.showErrorMsg('אירעה שגיאה ביצירת האירוע.');
            throw err;
        }
    };


    return (
        <form className="event-add-form" onSubmit={handleSubmit(onSubmit)}>

            <h3>אירוע חדש</h3>

            <FormField
                name="type"
                form={form}
                options={[
                    { label: he.eventType.fire, value: 'שריפה' },
                    { label: he.eventType.theft, value: 'גניבה' },
                    { label: he.eventType.fenceCut, value: 'חיתוך גדר' },
                    { label: he.eventType.protectionThreat, value: 'איום בפרוטקשן' },
                    { label: he.eventType.gunfire, value: 'ירי' },
                    { label: he.eventType.herdInvasion, value: 'פלישת עדר' }
                ]}
            />

            <FormField
                name="farmId"
                form={form}
                options={farms.map(farm => ({ label: farm.name, value: farm.id }))}
            />

            <div className="form-actions">
                <Button
                    type="submit"
                    label="צור"
                    size="small"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                />
            </div>

        </form>
    );
};