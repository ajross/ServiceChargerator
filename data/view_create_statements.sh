#!/bin/bash

for CHARGE in block_boiler_repairs_and_maintenance block_cleaning block_communal_electricity block_communal_electrical_maintenance block_communal_ventilation_maintenance block_communal_water_quality block_communal_window_cleaning block_concierge block_cctv block_disinfestation block_door_entry_system block_dry_riser block_lightning_protection block_lift_services_and_repairs block_fire_ventilation_maintenance block_repairs_and_maintenance block_tv_aerial block_ext_cleaning block_ext_external_tree_maintenance block_ext_grounds_maintenance block_ext_repairs_and_maintenance
do
echo "
DROP VIEW public.u_${CHARGE}_costs;

CREATE OR REPLACE VIEW public."u_${CHARGE}_costs"
 AS
SELECT year_end,
    estate_name,
    block_name,
	block_rv,
    $CHARGE,
    ${CHARGE}_unit
   FROM dataset_units
  WHERE year_end = 2023 AND $CHARGE > 0
  ORDER BY ${CHARGE}_unit DESC, estate_name, block_name, year_end;

ALTER TABLE public."u_${CHARGE}_costs"
    OWNER TO alembic;


DROP VIEW public.u_${CHARGE}_variation;

CREATE OR REPLACE VIEW public."u_${CHARGE}_variation"
 AS

select d.year_end,
       d.estate_name,
	   d.block_name,
       d.block_rv,
	   d.${CHARGE},
	   d.${CHARGE}_unit,
	   q.avg_estate_unit_cost
from
dataset_units d,
(SELECT dataset_units.estate_name,
            avg(dataset_units.${CHARGE}_unit) AS avg_estate_unit_cost
           FROM dataset_units
          WHERE dataset_units.year_end = 2023 AND dataset_units.${CHARGE} > 0
          GROUP BY dataset_units.estate_name
          ORDER BY avg_estate_unit_cost DESC, dataset_units.estate_name) q
where d.estate_name = q.estate_name and d.${CHARGE} > 0
order by avg_estate_unit_cost desc, dense_rank() over (order by d.estate_name), d.${CHARGE}_unit desc;

ALTER TABLE public."u_${CHARGE}_variation"
    OWNER TO alembic;"
done



for CHARGE in estate_cleaning estate_cctv estate_communal_electricity estate_grounds_maintenance estate_repairs_and_maintenance estate_tree_maintenance
do
echo "

DROP VIEW public.u_${CHARGE}_costs;

CREATE OR REPLACE VIEW public."u_${CHARGE}_costs"
 AS
SELECT year_end,
    estate_name,
    block_name,
	estate_rv,
    $CHARGE,
    ${CHARGE}_unit
   FROM dataset_units
  WHERE year_end = 2023 AND $CHARGE > 0
  ORDER BY ${CHARGE}_unit DESC, estate_name, block_name, year_end;

ALTER TABLE public."u_${CHARGE}_costs"
    OWNER TO alembic;

DROP VIEW public.u_${CHARGE}_variation;

CREATE OR REPLACE VIEW public."u_${CHARGE}_variation"
 AS
select d.year_end,
       d.estate_name,
	   d.block_name,
       d.estate_rv,
	   d.${CHARGE},
	   d.${CHARGE}_unit,
	   q.avg_estate_unit_cost
from
dataset_units d,
(SELECT dataset_units.estate_name,
          avg(dataset_units.${CHARGE}_unit) AS avg_estate_unit_cost
          FROM dataset_units
          WHERE dataset_units.year_end = 2023 AND dataset_units.${CHARGE} > 0
          GROUP BY dataset_units.estate_name
          ORDER BY avg_estate_unit_cost DESC, dataset_units.estate_name) q
where d.estate_name = q.estate_name and d.${CHARGE} > 0
order by avg_estate_unit_cost desc, dense_rank() over (order by d.estate_name), d.${CHARGE}_unit desc;

ALTER TABLE public."u_${CHARGE}_variation"
    OWNER TO alembic;"
done
