# Create tables and import data ready for processing

## Create a table for the raw dataset

Create a table for the raw data:

```sql
-- Table: public.IRN23346778_Raw

-- DROP TABLE IF EXISTS public."IRN23346778_Raw";

CREATE TABLE IF NOT EXISTS public."IRN23346778_Raw"
(
    block text COLLATE pg_catalog."default" NOT NULL,
    estate text COLLATE pg_catalog."default",
    rv text COLLATE pg_catalog."default",
    boiler_repairs_and_maintenance money,
    cctv money,
    cleaning money,
    communal_electricity money,
    communal_electical_maintenance money,
    tv_aerial money,
    communal_water_quality money,
    communal_window_cleaning money,
    communal_ventilation_maintenance money,
    concierge money,
    disinfestation money,
    dry_riser money,
    door_entry_system money,
    cleaning_external money,
    grounds_maintenance_external money,
    external_tree_maintenance money,
    repairs_and_maintenance_external money,
    fire_ventiation_maintenance money,
    repairs_and_maintenance money,
    lift_services_and_repairs money,
    lightning_protection money,
    CONSTRAINT "IRN23346778_Raw_pkey" PRIMARY KEY (block)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."IRN23346778_Raw"
    OWNER to alembic;
```

Import the IRN23346778.csv file.  Use the pgadmin dialogue to import it.

## Create table for cleaned data

Create a new table for the cleaned data using the correct data type for the rv column:

```sql
-- Table: public.IRN23346778_Clean

-- DROP TABLE IF EXISTS public."IRN23346778_Clean";

CREATE TABLE IF NOT EXISTS public."IRN23346778_Clean"
(
    block text COLLATE pg_catalog."default" NOT NULL,
    estate text COLLATE pg_catalog."default",
    rv integer,
    boiler_repairs_and_maintenance money,
    cctv money,
    cleaning money,
    communal_electricity money,
    communal_electical_maintenance money,
    tv_aerial money,
    communal_water_quality money,
    communal_window_cleaning money,
    communal_ventilation_maintenance money,
    concierge money,
    disinfestation money,
    dry_riser money,
    door_entry_system money,
    cleaning_external money,
    grounds_maintenance_external money,
    external_tree_maintenance money,
    repairs_and_maintenance_external money,
    fire_ventiation_maintenance money,
    repairs_and_maintenance money,
    lift_services_and_repairs money,
    lightning_protection money,
    CONSTRAINT "IRN23346778_Clean_pkey" PRIMARY KEY (block)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."IRN23346778_Clean"
    OWNER to alembic;
```

## Create a table for the estate charges

```sql
-- Table: public.Estate_Raw

-- DROP TABLE IF EXISTS public."Estate_Raw";

CREATE TABLE IF NOT EXISTS public."Estate_Raw"
(
    estate text COLLATE pg_catalog."default" NOT NULL,
    rv integer,
    cctv money,
    cleaning money,
    communal_electricity money,
    repairs_and_maintenance money,
    grounds_maintenance money,
    tree_maintenance money,
    CONSTRAINT "Estate_Raw_pkey" PRIMARY KEY (estate)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Estate_Raw"
    OWNER to alembic;
```

Import the estates.csv file using the pgadmin import tool.

## Create a table for the dataset

```sql
-- Table: public.dataset

-- DROP TABLE IF EXISTS public.dataset;

CREATE TABLE IF NOT EXISTS public.dataset
(
    year_start integer NOT NULL,
    year_end integer NOT NULL,
    estate_id character varying COLLATE pg_catalog."default",
    estate_name character varying COLLATE pg_catalog."default",
    estate_rv integer,
    block_id character varying COLLATE pg_catalog."default",
    block_name character varying COLLATE pg_catalog."default" NOT NULL,
    block_rv integer,
    block_boiler_repairs_and_maintenance numeric(10,2),
    block_cleaning numeric(10,2),
    block_communal_electricity numeric(10,2),
    block_communal_electrical_maintenance numeric(10,2),
    block_communal_ventilation_maintenance numeric(10,2),
    block_communal_water_quality numeric(10,2),
    block_communal_window_cleaning numeric(10,2),
    block_concierge numeric(10,2),
    block_cctv numeric(10,2),
    block_disinfestation numeric(10,2),
    block_door_entry_system numeric(10,2),
    block_dry_riser numeric(10,2),
    block_lightning_protection numeric(10,2),
    block_lift_services_and_repairs numeric(10,2),
    block_fire_ventilation_maintenance numeric(10,2),
    block_repairs_and_maintenance numeric(10,2),
    block_tv_aerial numeric(10,2),
    block_ext_cleaning numeric(10,2),
    block_ext_external_tree_maintenance numeric(10,2),
    block_ext_grounds_maintenance numeric(10,2),
    block_ext_repairs_and_maintenance numeric(10,2),
    estate_cleaning numeric(10,2),
    estate_cctv numeric(10,2),
    estate_communal_electricity numeric(10,2),
    estate_grounds_maintenance numeric(10,2),
    estate_repairs_and_maintenance numeric(10,2),
    estate_tree_maintenance numeric(10,2)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dataset
    OWNER to alembic;
```

## Create a table for filtered dataset with full non-NULL constraints

```sql
-- Table: public.dataset_filtered

-- DROP TABLE IF EXISTS public.dataset_filtered;

CREATE TABLE IF NOT EXISTS public.dataset_filtered
(
    year_start integer NOT NULL,
    year_end integer NOT NULL,
    estate_id character varying COLLATE pg_catalog."default" NOT NULL,
    estate_name character varying COLLATE pg_catalog."default" NOT NULL,
    estate_rv integer NOT NULL,
    block_id character varying COLLATE pg_catalog."default" NOT NULL,
    block_name character varying COLLATE pg_catalog."default" NOT NULL,
    block_rv integer NOT NULL,
    block_boiler_repairs_and_maintenance numeric(10,2) NOT NULL,
    block_cleaning numeric(10,2) NOT NULL,
    block_communal_electricity numeric(10,2) NOT NULL,
    block_communal_electrical_maintenance numeric(10,2) NOT NULL,
    block_communal_ventilation_maintenance numeric(10,2) NOT NULL,
    block_communal_water_quality numeric(10,2) NOT NULL,
    block_communal_window_cleaning numeric(10,2) NOT NULL,
    block_concierge numeric(10,2) NOT NULL,
    block_cctv numeric(10,2) NOT NULL,
    block_disinfestation numeric(10,2) NOT NULL,
    block_door_entry_system numeric(10,2) NOT NULL,
    block_dry_riser numeric(10,2) NOT NULL,
    block_lightning_protection numeric(10,2) NOT NULL,
    block_lift_services_and_repairs numeric(10,2) NOT NULL,
    block_fire_ventilation_maintenance numeric(10,2) NOT NULL,
    block_repairs_and_maintenance numeric(10,2) NOT NULL,
    block_tv_aerial numeric(10,2) NOT NULL,
    block_ext_cleaning numeric(10,2) NOT NULL,
    block_ext_external_tree_maintenance numeric(10,2) NOT NULL,
    block_ext_grounds_maintenance numeric(10,2) NOT NULL,
    block_ext_repairs_and_maintenance numeric(10,2) NOT NULL,
    estate_cleaning numeric(10,2) NOT NULL,
    estate_cctv numeric(10,2) NOT NULL,
    estate_communal_electricity numeric(10,2) NOT NULL,
    estate_grounds_maintenance numeric(10,2) NOT NULL,
    estate_repairs_and_maintenance numeric(10,2) NOT NULL,
    estate_tree_maintenance numeric(10,2) NOT NULL,
    CONSTRAINT dataset_filtered_pkey PRIMARY KEY (year_start, year_end, estate_id, block_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dataset_filtered
    OWNER to alembic;
```

## Create a table for the Estate List data

Create the Estate List table:

```sql
-- Table: public.Estate_List

-- DROP TABLE IF EXISTS public."Estate_List";

CREATE TABLE IF NOT EXISTS public."Estate_List"
(
    estate_code text COLLATE pg_catalog."default" NOT NULL,
    rv integer NOT NULL,
    estate_name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Estate_List_pkey" PRIMARY KEY (estate_code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Estate_List"
    OWNER to alembic;
```

Import the data using the pgadmin import tool.

```sql
UPDATE dataset set
estate_id = "Estate_List".estate_code
FROM
"Estate_List"
where UPPER(dataset.estate_name) = "Estate_List".estate_name
```

## Create a table for the Block List data

```sql
-- Table: public.Block_List

-- DROP TABLE IF EXISTS public."Block_List";

CREATE TABLE IF NOT EXISTS public."Block_List"
(
    block_structure_code text COLLATE pg_catalog."default",
    rv integer,
    block_name text COLLATE pg_catalog."default" NOT NULL,
    block_code text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Block_List"
    OWNER to alembic;
```

Import the data using the pgadmin import tool.

## Create a table for the Block Desc List data

Create the Block Desc List table:

```sql
-- Table: public.Block_Desc_List

-- DROP TABLE IF EXISTS public."Block_Desc_List";

CREATE TABLE IF NOT EXISTS public."Block_Desc_List"
(
    bd_code text COLLATE pg_catalog."default",
    bd_name text COLLATE pg_catalog."default",
    bd_rv integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Block_Desc_List"
    OWNER to alembic;
```

Import the data using the pgadmin import tool.

# Clean up the raw data

Insert all the data with a valid rv:

```sql
INSERT INTO public."IRN23346778_Clean"(
	block, estate, rv, boiler_repairs_and_maintenance, cctv, cleaning, communal_electricity, communal_electical_maintenance, tv_aerial, communal_water_quality, communal_window_cleaning, communal_ventilation_maintenance, concierge, disinfestation, dry_riser, door_entry_system, cleaning_external, grounds_maintenance_external, external_tree_maintenance, repairs_and_maintenance_external, fire_ventiation_maintenance, repairs_and_maintenance, lift_services_and_repairs, lightning_protection)
	select block, estate, cast(rv as integer), boiler_repairs_and_maintenance, cctv, cleaning, communal_electricity, communal_electical_maintenance, tv_aerial, communal_water_quality, communal_window_cleaning, communal_ventilation_maintenance, concierge, disinfestation, dry_riser, door_entry_system, cleaning_external, grounds_maintenance_external, external_tree_maintenance, repairs_and_maintenance_external, fire_ventiation_maintenance, repairs_and_maintenance, lift_services_and_repairs, lightning_protection from "IRN23346778_Raw" where rv not like '%#%';
```

Insert remaining rows with a blank rv

```sql
INSERT INTO public."IRN23346778_Clean"(
	block, estate, boiler_repairs_and_maintenance, cctv, cleaning, communal_electricity, communal_electical_maintenance, tv_aerial, communal_water_quality, communal_window_cleaning, communal_ventilation_maintenance, concierge, disinfestation, dry_riser, door_entry_system, cleaning_external, grounds_maintenance_external, external_tree_maintenance, repairs_and_maintenance_external, fire_ventiation_maintenance, repairs_and_maintenance, lift_services_and_repairs, lightning_protection)
	select block, estate, boiler_repairs_and_maintenance, cctv, cleaning, communal_electricity, communal_electical_maintenance, tv_aerial, communal_water_quality, communal_window_cleaning, communal_ventilation_maintenance, concierge, disinfestation, dry_riser, door_entry_system, cleaning_external, grounds_maintenance_external, external_tree_maintenance, repairs_and_maintenance_external, fire_ventiation_maintenance, repairs_and_maintenance, lift_services_and_repairs, lightning_protection from "IRN23346778_Raw" where rv like '%#%';
```

Set the rv for most of the blank rv vals in the cleaned data

```sql
update "IRN23346778_Clean" set rv = "Block_Desc_List".bd_rv from "Block_Desc_List" where "IRN23346778_Clean".rv is null and upper("IRN23346778_Clean".block) = "Block_Desc_List".bd_name
```

Set the rv for the last 2 blocks

```sql
update "IRN23346778_Clean" set rv = "Block_List".rv from "Block_List" where "IRN23346778_Clean".rv is null and upper("IRN23346778_Clean".block) = "Block_List".block_name
```

Set the estate name for all the street properties

```sql
update "IRN23346778_Clean" set estate = 'Street Property' where estate is null
```


# Create the dataset

## Insert block data into dataset table

```sql
INSERT INTO public.dataset(
       			  year_start, 		 year_end, estate_name, block_name, block_rv, block_boiler_repairs_and_maintenance, block_cleaning, block_communal_electricity, block_communal_electrical_maintenance, block_communal_ventilation_maintenance, block_communal_water_quality, block_communal_window_cleaning, block_concierge, block_cctv, block_disinfestation, block_door_entry_system, block_dry_riser, block_lightning_protection, block_lift_services_and_repairs, block_fire_ventilation_maintenance, block_repairs_and_maintenance, block_tv_aerial, block_ext_cleaning, block_ext_external_tree_maintenance, block_ext_grounds_maintenance, block_ext_repairs_and_maintenance)
	SELECT '2022' year_start, '2023' year_end, estate,      block,      rv,       boiler_repairs_and_maintenance,       cleaning,       communal_electricity,       communal_electical_maintenance,        communal_ventilation_maintenance,       communal_water_quality,       communal_window_cleaning,       concierge,       cctv,       disinfestation,       door_entry_system,       dry_riser,       lightning_protection,       lift_services_and_repairs,       fire_ventiation_maintenance,        repairs_and_maintenance,       tv_aerial,       cleaning_external,  external_tree_maintenance,           grounds_maintenance_external,  repairs_and_maintenance_external
	FROM public."IRN23346778_Clean";
```

## Add Estate data into dataset table

```sql
UPDATE dataset set
estate_rv = "Estate_Raw".rv,
estate_cleaning = "Estate_Raw".cleaning,
estate_cctv = "Estate_Raw".cctv,
estate_communal_electricity = "Estate_Raw".communal_electricity,
estate_grounds_maintenance = "Estate_Raw".grounds_maintenance,
estate_repairs_and_maintenance = "Estate_Raw".repairs_and_maintenance,
estate_tree_maintenance = "Estate_Raw".tree_maintenance
FROM
"Estate_Raw"
where dataset.estate_name = "Estate_Raw".estate
```

## Add Estate IDs from Estate List table

```sql
UPDATE dataset set
estate_id = "Estate_List".estate_code
FROM
"Estate_List"
where UPPER(dataset.estate_name) = "Estate_List".estate_name
```

## Add Block IDs from the Block Desc List table

```sql
UPDATE dataset set
block_id = "Block_Desc_List".bd_code
FROM
"Block_Desc_List"
where UPPER(dataset.block_name) = "Block_Desc_List".bd_name
```

## Set estate name and id, and estate costs for all street properties

```sql
update dataset set
estate_id = 'EX01'
where estate_name = 'Street Property'
```

```sql
UPDATE dataset set
estate_rv = 0,
estate_cleaning = 0,
estate_cctv = 0,
estate_communal_electricity = 0,
estate_grounds_maintenance = 0,
estate_repairs_and_maintenance = 0,
estate_tree_maintenance = 0
where estate_name = 'Street Property'
and estate_rv is null
and estate_cleaning is null
and estate_communal_electricity is null
and estate_grounds_maintenance is null
and estate_repairs_and_maintenance is null
and estate_tree_maintenance is null
```

# Data Quality

At this point there are 315 rows with no block_id, and (more importantly) 19 rows with no estate rv.

# Create the filtered dataset

Only use the data for which we've got fully populated rows:

```sql
INSERT INTO public.dataset_filtered(
	year_start, year_end, estate_id, estate_name, estate_rv, block_id, block_name, block_rv, block_boiler_repairs_and_maintenance, block_cleaning, block_communal_electricity, block_communal_electrical_maintenance, block_communal_ventilation_maintenance, block_communal_water_quality, block_communal_window_cleaning, block_concierge, block_cctv, block_disinfestation, block_door_entry_system, block_dry_riser, block_lightning_protection, block_lift_services_and_repairs, block_fire_ventilation_maintenance, block_repairs_and_maintenance, block_tv_aerial, block_ext_cleaning, block_ext_external_tree_maintenance, block_ext_grounds_maintenance, block_ext_repairs_and_maintenance, estate_cleaning, estate_cctv, estate_communal_electricity, estate_grounds_maintenance, estate_repairs_and_maintenance, estate_tree_maintenance)
	select * from dataset where estate_id is not null and estate_rv is not null and block_id is not null and block_rv is not null
```

# Create a new table that includes all the unit costs for each service

```sql
-- Table: public.dataset_units

-- DROP TABLE IF EXISTS public.dataset_units;

CREATE TABLE IF NOT EXISTS public.dataset_units
(
    year_start integer NOT NULL,
    year_end integer NOT NULL,
    estate_id character varying COLLATE pg_catalog."default" NOT NULL,
    estate_name character varying COLLATE pg_catalog."default" NOT NULL,
    estate_rv integer NOT NULL,
    block_id character varying COLLATE pg_catalog."default" NOT NULL,
    block_name character varying COLLATE pg_catalog."default" NOT NULL,
    block_rv integer NOT NULL,
    block_boiler_repairs_and_maintenance numeric(10,2) NOT NULL,
	block_boiler_repairs_and_maintenance_unit numeric NOT NULL,
    block_cleaning numeric(10,2) NOT NULL,
	block_cleaning_unit numeric NOT NULL,
    block_communal_electricity numeric(10,2) NOT NULL,
	block_communal_electricity_unit numeric NOT NULL,
    block_communal_electrical_maintenance numeric(10,2) NOT NULL,
	block_communal_electrical_maintenance_unit numeric NOT NULL,
    block_communal_ventilation_maintenance numeric(10,2) NOT NULL,
	block_communal_ventilation_maintenance_unit numeric NOT NULL,
    block_communal_water_quality numeric(10,2) NOT NULL,
	block_communal_water_quality_unit numeric NOT NULL,
    block_communal_window_cleaning numeric(10,2) NOT NULL,
	block_communal_window_cleaning_unit numeric NOT NULL,
    block_concierge numeric(10,2) NOT NULL,
	block_concierge_unit numeric NOT NULL,
    block_cctv numeric(10,2) NOT NULL,
	block_cctv_unit numeric NOT NULL,
    block_disinfestation numeric(10,2) NOT NULL,
	block_disinfestation_unit numeric NOT NULL,
    block_door_entry_system numeric(10,2) NOT NULL,
	block_door_entry_system_unit numeric NOT NULL,
    block_dry_riser numeric(10,2) NOT NULL,
	block_dry_riser_unit numeric NOT NULL,
    block_lightning_protection numeric(10,2) NOT NULL,
	block_lightning_protection_unit numeric NOT NULL,
    block_lift_services_and_repairs numeric(10,2) NOT NULL,
	block_lift_services_and_repairs_unit numeric NOT NULL,
    block_fire_ventilation_maintenance numeric(10,2) NOT NULL,
	block_fire_ventilation_maintenance_unit numeric NOT NULL,
    block_repairs_and_maintenance numeric(10,2) NOT NULL,
	block_repairs_and_maintenance_unit numeric NOT NULL,
    block_tv_aerial numeric(10,2) NOT NULL,
	block_tv_aerial_unit numeric NOT NULL,
    block_ext_cleaning numeric(10,2) NOT NULL,
	block_ext_cleaning_unit numeric NOT NULL,
    block_ext_external_tree_maintenance numeric(10,2) NOT NULL,
	block_ext_external_tree_maintenance_unit numeric NOT NULL,
    block_ext_grounds_maintenance numeric(10,2) NOT NULL,
	block_ext_grounds_maintenance_unit numeric NOT NULL,
    block_ext_repairs_and_maintenance numeric(10,2) NOT NULL,
	block_ext_repairs_and_maintenance_unit numeric NOT NULL,
    estate_cleaning numeric(10,2) NOT NULL,
	estate_cleaning_unit numeric NOT NULL,
    estate_cctv numeric(10,2) NOT NULL,
	estate_cctv_unit numeric NOT NULL,
    estate_communal_electricity numeric(10,2) NOT NULL,
	estate_communal_electricity_unit numeric NOT NULL,
    estate_grounds_maintenance numeric(10,2) NOT NULL,
	estate_grounds_maintenance_unit numeric NOT NULL,
    estate_repairs_and_maintenance numeric(10,2) NOT NULL,
	estate_repairs_and_maintenance_unit numeric NOT NULL,
    estate_tree_maintenance numeric(10,2) NOT NULL,
	estate_tree_maintenance_unit numeric NOT NULL,
    CONSTRAINT dataset_units_pkey PRIMARY KEY (year_start, year_end, estate_id, block_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dataset_units
    OWNER to alembic;
```

# Insert the data from the dataset_filtered table

```sql
INSERT INTO public.dataset_units(
	   year_start, year_end, estate_id, estate_name, estate_rv, block_id, block_name, block_rv, block_boiler_repairs_and_maintenance, block_boiler_repairs_and_maintenance_unit,       block_cleaning, block_cleaning_unit,       block_communal_electricity, block_communal_electricity_unit,       block_communal_electrical_maintenance, block_communal_electrical_maintenance_unit,       block_communal_ventilation_maintenance, block_communal_ventilation_maintenance_unit,       block_communal_water_quality, block_communal_water_quality_unit,       block_communal_window_cleaning, block_communal_window_cleaning_unit,       block_concierge, block_concierge_unit,       block_cctv, block_cctv_unit,       block_disinfestation, block_disinfestation_unit,       block_door_entry_system, block_door_entry_system_unit,       block_dry_riser, block_dry_riser_unit,       block_lightning_protection, block_lightning_protection_unit,       block_lift_services_and_repairs, block_lift_services_and_repairs_unit,       block_fire_ventilation_maintenance, block_fire_ventilation_maintenance_unit,       block_repairs_and_maintenance, block_repairs_and_maintenance_unit,       block_tv_aerial, block_tv_aerial_unit,       block_ext_cleaning, block_ext_cleaning_unit,       block_ext_external_tree_maintenance, block_ext_external_tree_maintenance_unit,       block_ext_grounds_maintenance, block_ext_grounds_maintenance_unit,       block_ext_repairs_and_maintenance, block_ext_repairs_and_maintenance_unit,       estate_cleaning, estate_cleaning_unit,        estate_cctv, estate_cctv_unit,        estate_communal_electricity, estate_communal_electricity_unit,        estate_grounds_maintenance, estate_grounds_maintenance_unit,        estate_repairs_and_maintenance, estate_repairs_and_maintenance_unit,        estate_tree_maintenance, estate_tree_maintenance_unit)
select year_start, year_end, estate_id, estate_name, estate_rv, block_id, block_name, block_rv, block_boiler_repairs_and_maintenance, block_boiler_repairs_and_maintenance / block_rv, block_cleaning, block_cleaning / block_rv, block_communal_electricity, block_communal_electricity / block_rv, block_communal_electrical_maintenance, block_communal_electrical_maintenance / block_rv, block_communal_ventilation_maintenance, block_communal_ventilation_maintenance / block_rv, block_communal_water_quality, block_communal_water_quality / block_rv, block_communal_window_cleaning, block_communal_window_cleaning / block_rv, block_concierge, block_concierge / block_rv, block_cctv, block_cctv / block_rv, block_disinfestation, block_disinfestation / block_rv, block_door_entry_system, block_door_entry_system / block_rv, block_dry_riser, block_dry_riser / block_rv, block_lightning_protection, block_lightning_protection / block_rv, block_lift_services_and_repairs, block_lift_services_and_repairs / block_rv, block_fire_ventilation_maintenance, block_fire_ventilation_maintenance / block_rv, block_repairs_and_maintenance, block_repairs_and_maintenance / block_rv, block_tv_aerial, block_tv_aerial / block_rv, block_ext_cleaning, block_ext_cleaning / block_rv, block_ext_external_tree_maintenance, block_ext_external_tree_maintenance / block_rv, block_ext_grounds_maintenance, block_ext_grounds_maintenance / block_rv, block_ext_repairs_and_maintenance, block_ext_repairs_and_maintenance / block_rv, estate_cleaning, case when estate_rv = 0 then 0 else estate_cleaning / estate_rv end, estate_cctv, case when estate_rv = 0 then 0 else estate_cctv / estate_rv end, estate_communal_electricity, case when estate_rv = 0 then 0 else estate_communal_electricity / estate_rv end, estate_grounds_maintenance, case when estate_rv = 0 then 0 else estate_grounds_maintenance / estate_rv end, estate_repairs_and_maintenance, case when estate_rv = 0 then 0 else estate_repairs_and_maintenance / estate_rv end, estate_tree_maintenance, case when estate_rv = 0 then 0 else estate_tree_maintenance / estate_rv end
from dataset_filtered;
```




----------------

# Update with full data from FOI response

## Create tables for raw estates and blocks data

```sql
-- Table: public.Final_Estate

-- DROP TABLE IF EXISTS public."Final_Estate";

CREATE TABLE IF NOT EXISTS public."Final_Estate"
(
    estate text COLLATE pg_catalog."default",
    rv integer,
    cctv numeric,
    cleaning numeric,
    communal_electricity numeric,
    repairs_and_maintenance numeric,
    grounds_maintenance numeric,
    tree_maintenance numeric
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Final_Estate"
    OWNER to alembic;
```


Import the Estate.csv file.  Use the pgadmin dialogue to import it.

```sql
-- Table: public.Final_Block

-- DROP TABLE IF EXISTS public."Final_Block";

CREATE TABLE IF NOT EXISTS public."Final_Block"
(
    block text COLLATE pg_catalog."default",
    estate text COLLATE pg_catalog."default",
    rv integer,
    boiler_repairs_and_maintenance numeric,
    cctv numeric,
    cleaning numeric,
    communal_electricity numeric,
    communal_electrical_maintenance numeric,
    tv_aerial numeric,
    communal_water_quality numeric,
    communal_window_cleaning numeric,
    communal_ventilation_maintenance numeric,
    concierge numeric,
    disinfestation numeric,
    dry_riser numeric,
    door_entry_system numeric,
    cleaning_external numeric,
    grounds_maintenance_external numeric,
    external_tree_maintenance numeric,
    repairs_and_maintenance_external numeric,
    fire_ventilation_maintenance numeric,
    repairs_and_maintenance numeric,
    lift_services_and_repairs numeric,
    lightning_protection numeric
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Final_Block"
    OWNER to alembic;
```

Import the Block.csv file.  Use the pgadmin dialogue to import it.


## Create a staging table to build the dataset

```sql
-- DROP TABLE IF EXISTS public.final_staged_dataset;

CREATE TABLE IF NOT EXISTS public.final_staged_dataset
(
    year_start integer NOT NULL,
    year_end integer NOT NULL,
    estate_id character varying COLLATE pg_catalog."default",
    estate_name character varying COLLATE pg_catalog."default",
    estate_rv integer,
    block_id character varying COLLATE pg_catalog."default",
    block_name character varying COLLATE pg_catalog."default" NOT NULL,
    block_rv integer,
    block_boiler_repairs_and_maintenance numeric(10,2),
    block_cleaning numeric(10,2),
    block_communal_electricity numeric(10,2),
    block_communal_electrical_maintenance numeric(10,2),
    block_communal_ventilation_maintenance numeric(10,2),
    block_communal_water_quality numeric(10,2),
    block_communal_window_cleaning numeric(10,2),
    block_concierge numeric(10,2),
    block_cctv numeric(10,2),
    block_disinfestation numeric(10,2),
    block_door_entry_system numeric(10,2),
    block_dry_riser numeric(10,2),
    block_lightning_protection numeric(10,2),
    block_lift_services_and_repairs numeric(10,2),
    block_fire_ventilation_maintenance numeric(10,2),
    block_repairs_and_maintenance numeric(10,2),
    block_tv_aerial numeric(10,2),
    block_ext_cleaning numeric(10,2),
    block_ext_external_tree_maintenance numeric(10,2),
    block_ext_grounds_maintenance numeric(10,2),
    block_ext_repairs_and_maintenance numeric(10,2),
    estate_cleaning numeric(10,2),
    estate_cctv numeric(10,2),
    estate_communal_electricity numeric(10,2),
    estate_grounds_maintenance numeric(10,2),
    estate_repairs_and_maintenance numeric(10,2),
    estate_tree_maintenance numeric(10,2)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.final_staged_dataset
    OWNER to alembic;
```

## Insert the block data into the staging table

```sql
INSERT INTO public.final_staged_dataset(
       			  year_start, 		 year_end, estate_name, block_name, block_rv, block_boiler_repairs_and_maintenance, block_cleaning, block_communal_electricity, block_communal_electrical_maintenance, block_communal_ventilation_maintenance, block_communal_water_quality, block_communal_window_cleaning, block_concierge, block_cctv, block_disinfestation, block_door_entry_system, block_dry_riser, block_lightning_protection, block_lift_services_and_repairs, block_fire_ventilation_maintenance, block_repairs_and_maintenance, block_tv_aerial, block_ext_cleaning, block_ext_external_tree_maintenance, block_ext_grounds_maintenance, block_ext_repairs_and_maintenance)
	SELECT '2022' year_start, '2023' year_end, estate,      block,      rv,       boiler_repairs_and_maintenance,       cleaning,       communal_electricity,       communal_electrical_maintenance,        communal_ventilation_maintenance,       communal_water_quality,       communal_window_cleaning,       concierge,       cctv,       disinfestation,       door_entry_system,       dry_riser,       lightning_protection,       lift_services_and_repairs,       fire_ventilation_maintenance,        repairs_and_maintenance,       tv_aerial,       cleaning_external,  external_tree_maintenance,           grounds_maintenance_external,  repairs_and_maintenance_external
	FROM public."Final_Block";
```

## Insert the estate data into the staging table

```sql
UPDATE final_staged_dataset set
estate_rv = "Final_Estate".rv,
estate_cleaning = "Final_Estate".cleaning,
estate_cctv = "Final_Estate".cctv,
estate_communal_electricity = "Final_Estate".communal_electricity,
estate_grounds_maintenance = "Final_Estate".grounds_maintenance,
estate_repairs_and_maintenance = "Final_Estate".repairs_and_maintenance,
estate_tree_maintenance = "Final_Estate".tree_maintenance
FROM
"Final_Estate"
where final_staged_dataset.estate_name = "Final_Estate".estate
```

## Set the Estate IDs


```sql
UPDATE final_staged_dataset set
estate_id = "Estate_List".estate_code
FROM
"Estate_List"
where UPPER(final_staged_dataset.estate_name) = "Estate_List".estate_name
```

## Add Block IDs from the Block Desc List table

```sql
UPDATE final_staged_dataset set
block_id = "Block_Desc_List".bd_code
FROM
"Block_Desc_List"
where UPPER(final_staged_dataset.block_name) = "Block_Desc_List".bd_name
```

## Set estate name and id, and estate costs for all street properties

```sql

update final_staged_dataset set
estate_id = 'EX01',
estate_name = 'Street Property'
where estate_name is null
```

```sql
UPDATE final_staged_dataset set
estate_rv = 0,
estate_cleaning = 0,
estate_cctv = 0,
estate_communal_electricity = 0,
estate_grounds_maintenance = 0,
estate_repairs_and_maintenance = 0,
estate_tree_maintenance = 0
where estate_name = 'Street Property'
and estate_rv is null
and estate_cleaning is null
and estate_communal_electricity is null
and estate_grounds_maintenance is null
and estate_repairs_and_maintenance is null
and estate_tree_maintenance is null
```


## Set the missing estate and block IDs

```sql
update final_staged_dataset
set estate_id = 'EA019'
where estate_name = 'Caldwell Gardens Estate Sv'
```

```sql
update final_staged_dataset
set estate_id = 'EA056'
where estate_name = 'Holland Town Estate Sv'
```

```sql
update final_staged_dataset
set block_id = "Block_List".block_code 
from "Block_List" 
where final_staged_dataset.block_id is null and upper(final_staged_dataset.block_name) = "Block_List".block_name
```


```sql
update final_staged_dataset
set block_id = 'BD000009'
where block_name = 'Nelsons Row 33-47 (Odd)';

update final_staged_dataset
set block_id = 'BD000352'
where block_name = 'Lydwell House  1-18';

update final_staged_dataset
set block_id = 'BD000694'
where block_name = 'Upgrove Manor Way 1-39 (Odd)';

update final_staged_dataset
set block_id = 'BD001082'
where block_name = 'Holdsworth House 1 - 20';

update final_staged_dataset
set block_id = 'BD002080'
where block_name = 'Barcombe Avenue 791&2';

update final_staged_dataset
set block_id = 'BD002784'
where block_name = 'Staplefield Close 53-73 Incl 53a';
```


## Assign a unique ID to the remaining ~300 rows that don't have a block_id

```sql
CREATE SEQUENCE id_sequence START WITH 1;

UPDATE final_staged_dataset
SET block_id = COALESCE(block_id, 'BX' || LPAD(nextval('id_sequence')::text, 6, '0'))
WHERE block_id IS NULL;
```


## Create the cleaned dataset table

```sql
CREATE TABLE IF NOT EXISTS public.final_dataset
(
    year_start integer NOT NULL,
    year_end integer NOT NULL,
    estate_id character varying COLLATE pg_catalog."default" NOT NULL,
    estate_name character varying COLLATE pg_catalog."default" NOT NULL,
    estate_rv integer NOT NULL,
    block_id character varying COLLATE pg_catalog."default" NOT NULL,
    block_name character varying COLLATE pg_catalog."default" NOT NULL,
    block_rv integer NOT NULL,
    block_boiler_repairs_and_maintenance numeric(10,2) NOT NULL,
    block_cleaning numeric(10,2) NOT NULL,
    block_communal_electricity numeric(10,2) NOT NULL,
    block_communal_electrical_maintenance numeric(10,2) NOT NULL,
    block_communal_ventilation_maintenance numeric(10,2) NOT NULL,
    block_communal_water_quality numeric(10,2) NOT NULL,
    block_communal_window_cleaning numeric(10,2) NOT NULL,
    block_concierge numeric(10,2) NOT NULL,
    block_cctv numeric(10,2) NOT NULL,
    block_disinfestation numeric(10,2) NOT NULL,
    block_door_entry_system numeric(10,2) NOT NULL,
    block_dry_riser numeric(10,2) NOT NULL,
    block_lightning_protection numeric(10,2) NOT NULL,
    block_lift_services_and_repairs numeric(10,2) NOT NULL,
    block_fire_ventilation_maintenance numeric(10,2) NOT NULL,
    block_repairs_and_maintenance numeric(10,2) NOT NULL,
    block_tv_aerial numeric(10,2) NOT NULL,
    block_ext_cleaning numeric(10,2) NOT NULL,
    block_ext_external_tree_maintenance numeric(10,2) NOT NULL,
    block_ext_grounds_maintenance numeric(10,2) NOT NULL,
    block_ext_repairs_and_maintenance numeric(10,2) NOT NULL,
    estate_cleaning numeric(10,2) NOT NULL,
    estate_cctv numeric(10,2) NOT NULL,
    estate_communal_electricity numeric(10,2) NOT NULL,
    estate_grounds_maintenance numeric(10,2) NOT NULL,
    estate_repairs_and_maintenance numeric(10,2) NOT NULL,
    estate_tree_maintenance numeric(10,2) NOT NULL,
    CONSTRAINT final_dataset_pkey PRIMARY KEY (year_start, year_end, estate_id, block_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.final_dataset
    OWNER to alembic;
```