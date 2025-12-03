-- Insert plans
INSERT INTO public.plans (name, type, price, duration_days, features, is_bestseller) VALUES
  ('Día', 'day', 50000, 1, ARRAY['Acceso a todas las áreas', 'Áreas de cardio', 'Pesas libres'], FALSE),
  ('Semanal', 'weekly', 250000, 7, ARRAY['Acceso a todas las áreas', 'Áreas de cardio', 'Pesas libres', 'Clases grupales'], FALSE),
  ('Mensual', 'monthly', 900000, 30, ARRAY['Acceso a todas las áreas', 'Áreas de cardio', 'Pesas libres', 'Clases grupales', 'Asesoría personalizada'], TRUE),
  ('Trimestral', 'quarterly', 2400000, 90, ARRAY['Acceso a todas las áreas', 'Áreas de cardio', 'Pesas libres', 'Clases grupales', 'Asesoría personalizada', 'Nutrición'], FALSE);

-- Insert sedes (Colombian cities)
INSERT INTO public.sedes (city, address, phone, image_url, capacity) VALUES
  ('Bogotá', 'Carrera 7 #125, Bogotá', '+57 1 2341234', '/gym-bogota-fitness-center.jpg', 500),
  ('Medellín', 'Calle 49 #43A, Medellín', '+57 4 2675432', '/gym-medellin-modern-fitness.jpg', 400),
  ('Barranquilla', 'Carrera 52 #76, Barranquilla', '+57 5 3451234', '/gym-barranquilla-tropical-fitness.jpg', 300),
  ('Cartagena', 'Calle 3 #2-34, Cartagena', '+57 5 6541234', '/gym-cartagena-caribbean-fitness.jpg', 250);

-- Insert services
INSERT INTO public.services (name, description, price, capacity, image_url) VALUES
  ('CrossFit', 'Entrenamientos funcionales de alta intensidad', 350000, 20, '/placeholder.svg?height=400&width=600'),
  ('Personal Training', 'Sesiones personalizadas con entrenador certificado', 200000, 1, '/placeholder.svg?height=400&width=600'),
  ('Zumba', 'Clases de baile y movimiento al ritmo de la música', 150000, 30, '/placeholder.svg?height=400&width=600'),
  ('Yoga', 'Clases de yoga y meditación para flexibilidad y paz mental', 120000, 25, '/placeholder.svg?height=400&width=600');

-- Insert class schedules for Bogotá
INSERT INTO public.class_schedules (service_id, sede_id, day_of_week, start_time, end_time, instructor, capacity) 
SELECT s.id, se.id, dow.day, t.start_time, t.end_time, t.instructor, 20
FROM public.services s
CROSS JOIN public.sedes se
CROSS JOIN (VALUES (1), (3), (5)) AS dow(day)
CROSS JOIN (
  VALUES 
    ('06:00:00'::TIME, '07:00:00'::TIME, 'Carlos Rodríguez'),
    ('18:00:00'::TIME, '19:00:00'::TIME, 'Ana Martínez'),
    ('19:30:00'::TIME, '20:30:00'::TIME, 'Juan López')
) AS t(start_time, end_time, instructor)
WHERE se.city = 'Bogotá';
